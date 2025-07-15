import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { app } from "../../firebase.init";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register new user (email, password, displayName, photoFile)
  const createUser = async (email, password, displayName, photoFile) => {
    setLoading(true);

    // Create user with email/password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // If photo file provided, upload to Firebase Storage
    let photoURL = "";
    if (photoFile) {
      const storageRef = ref(storage, `profileImages/${userCredential.user.uid}_${photoFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, photoFile);

      // Return a promise that resolves when upload completes
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            setLoading(false);
            reject(error);
          },
          async () => {
            photoURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    // Update profile with displayName and photoURL (if uploaded)
    await updateProfile(userCredential.user, {
      displayName: displayName || "Anonymous",
      photoURL: photoURL || "",
    });

    // Update local user state with updated profile
    setUser({
      ...userCredential.user,
      displayName: displayName || "Anonymous",
      photoURL: photoURL || "",
    });

    setLoading(false);

    return userCredential;
  };

  // Email login
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // 🔐 Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("CurrentUser -->", currentUser?.email);
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          // Encode email to safely pass in URL
          const encodedEmail = encodeURIComponent(currentUser.email);

          // ✅ Check if user already exists
          const { data: existingUser } = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/email/${encodedEmail}`
          );

          if (!existingUser) {
            // 🆕 Save new user (insert only)
            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/users`,
              {
                email: currentUser.email,
                displayName: currentUser.displayName || "Anonymous",
                photoURL: currentUser.photoURL || "",
                role: "customer", // default
                createdAt: new Date(),
              },
              { withCredentials: true }
            );
          }
        } catch (error) {
          // Handle 404 user not found gracefully (expected for new user)
          if (error.response?.status === 404) {
            try {
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users`,
                {
                  email: currentUser.email,
                  displayName: currentUser.displayName || "Anonymous",
                  photoURL: currentUser.photoURL || "",
                  role: "customer",
                  createdAt: new Date(),
                },
                { withCredentials: true }
              );
            } catch (postError) {
              console.error("Failed to create new user:", postError);
            }
          } else {
            console.error("Failed to save/check user in MongoDB:", error);
          }
        }

        // ✅ Get JWT token
        await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: currentUser.email,
          },
          { withCredentials: true }
        );
      } else {
        // Logout fallback
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
          withCredentials: true,
        });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

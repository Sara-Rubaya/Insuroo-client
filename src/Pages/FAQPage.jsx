import { useState } from 'react';

const initialFAQs = [
  {
    id: 1,
    question: 'What is life insurance and why do I need it?',
    answer:
      'Life insurance is a contract that provides financial protection to your beneficiaries in case of your death. It helps cover expenses like debts, funeral costs, and lost income.',
    helpful: 5,
  },
  {
    id: 2,
    question: 'How much coverage should I get?',
    answer:
      'It depends on your income, debts, family needs, and long-term goals. A good rule is 10–15 times your annual income.',
    helpful: 3,
  },
  {
    id: 3,
    question: 'What’s the difference between term and whole life insurance?',
    answer:
      'Term life insurance provides coverage for a fixed period and is more affordable. Whole life lasts your lifetime and builds cash value but is more expensive.',
    helpful: 7,
  },
];

const FAQsPage = () => {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [openId, setOpenId] = useState(null);

  const toggleAnswer = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  const handleHelpful = (id) => {
    const updatedFaqs = faqs.map((faq) =>
      faq.id === id ? { ...faq, helpful: faq.helpful + 1 } : faq
    );
    setFaqs(updatedFaqs);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 my-16">
      <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-400 to-violet-600 bg-clip-text text-transparent">
        FAQs & Forum
      </h2>

      <div className="space-y-4">
        {faqs.map(({ id, question, answer, helpful }) => (
          <div
            key={id}
            className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white"
          >
            <button
              onClick={() => toggleAnswer(id)}
              className="w-full text-left text-lg font-semibold focus:outline-none"
            >
              {question}
            </button>

            {openId === id && (
              <div className="mt-2 text-gray-700">{answer}</div>
            )}

            <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
              <button
                onClick={() => handleHelpful(id)}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50  dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2"
              >
                Helpful
              </button>
              <span>({helpful})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsPage;

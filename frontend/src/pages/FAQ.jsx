import React, { useState } from 'react';
import { ChevronDown, Code, Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What is the main objective of this system?",
    answer: "To automate waste segregation into four distinct categories—Hazardous, Organic, Recyclable, and Non-Recyclable—using Deep Learning to improve recycling efficiency and safety."
  },
  {
    question: "Which model architecture was used and why?",
    answer: "We implemented an Ensemble Model combining VGG16 and ResNet50. This approach merges VGG16’s texture analysis with ResNet50’s deep feature extraction, achieving higher accuracy than individual models."
  },
  {
    question: "How does the model process the images?",
    answer: "Input images are resized to 224×224 and passed to both networks simultaneously via a shared input tensor. Their feature vectors are concatenated and processed by a final dense layer for classification."
  },
  {
    question: "How did you handle the lack of \"Hazardous\" data in public datasets?",
    answer: "Most standard datasets group hazardous items (like spray cans) with recyclables. We manually curated a specific dataset for hazardous waste to correct this labeling conflict and prevent classification errors."
  },
  {
    question: "How did you resolve class imbalance (3200 vs. 780 images)?",
    answer: "We applied Random Undersampling to the majority classes (Recyclable/Organic), capping them at 1,200 images. This ensured the model prioritized the minority classes (Hazardous/Non-Recyclable) equally."
  },
  {
    question: "What technology stack supports the application?",
    answer: "The system uses TensorFlow/Keras for model training, Flask (Python) for the backend API, and React.js for the frontend user interface."
  },
  {
    question: "What is the future scope of this project?",
    answer: "Future enhancements include integrating the system with IoT-enabled Smart Bins for physical sorting and implementing YOLO (You Only Look Once) for real-time detection of multiple objects in a single frame."
  },
  {
    question: "Why did you use Transfer Learning instead of training from scratch?",
    answer: "Training from scratch requires millions of images and massive computational power. Transfer Learning allowed us to use pre-trained weights (from ImageNet), effectively letting our model \"reuse\" knowledge about shapes and textures, achieving high accuracy with a smaller dataset."
  },
  {
    question: "Why did you use the 'Adam' optimizer?",
    answer: "We chose Adam (Adaptive Moment Estimation) because it automatically adjusts the learning rate during training. It converges faster than standard Gradient Descent and handles sparse gradients well, which is crucial for complex image classification tasks."
  },
  {
    question: "What is the purpose of the 'Softmax' activation function in the final layer?",
    answer: "Softmax converts the raw output scores (logits) of the model into probabilities that sum up to 1. This allows the system to confidently say, \"I am 90% sure this is Recyclable,\" rather than just giving an arbitrary number."
  },
  {
    question: "Did you face overfitting, and how did you prevent it?",
    answer: "Yes, deep models often overfit. We prevented this by adding Dropout layers (randomly disabling 40% of neurons during training) and using Data Augmentation (rotation, zooming) to force the model to learn robust features rather than memorizing exact images."
  },
  {
    question: "How does the system handle images with complex backgrounds?",
    answer: "The use of VGG16 helps distinctively capture object edges and shapes even against noisy backgrounds. However, extreme clutter can still affect accuracy. In a real-world deployment, we would recommend a controlled environment (like a bin with a neutral background) for optimal results."
  },
  {
    question: "What happens if the model receives an image that isn't waste (e.g., a human face)?",
    answer: "Currently, the model forces every input into one of the four waste classes (Softmax). A future improvement would be to implement a \"thresholding\" logic: if the highest confidence score is below 60%, the system should output \"Unknown Object\" instead of making a wrong guess."
  },
  {
    question: "Why use a web interface instead of a mobile app?",
    answer: "A React-based web interface provides cross-platform compatibility immediately (accessible on both iOS, Android, and Desktop) without separate codebases. It serves as a proof-of-concept that can easily be wrapped into a mobile app later using React Native."
  },
  {
    question: "Why didn't you use a lighter model like MobileNet?",
    answer: "While MobileNet is faster, our priority was maximum accuracy for safety (distinguishing Hazardous waste). The Ensemble of VGG16+ResNet50 provides superior feature extraction capabilities compared to lightweight models, which is a worthwhile trade-off for a stationary waste sorting station."
  },
  {
    question: "How is your 4-class system better than existing smart bins?",
    answer: "Many existing projects only classify \"Metal vs. Plastic\" or \"Wet vs. Dry.\" Our system introduces the Hazardous category, which is critical for environmental safety and compliance with modern e-waste regulations, giving it a significant edge in practical utility."
  }
];
const teamMembers = [
  { 
    name: 'Vadisila Lohith', 
    role: 'Model Developer',
    desc: 'Designed the VGG16+ResNet50 Ensemble & Training Pipeline.',
    icon: Code,
  },
  { 
    name: 'Yarramsetti Satya Sai Venkat', 
    role: 'Backend & Integration Lead',
    desc: 'Built the Flask API and handled Model Deployment & Hosted project.',
    icon: Code,
  },
  { 
    name: 'Tipanna Chetan', 
    role: 'Frontend UI Developer',
    desc: 'Developed the React Interface and User Experience.',
    icon: Palette,
  },
  { 
    name: 'Katta Nikhil', 
    role: 'Data Collector & QA',
    desc: 'Managed the Hazardous Waste Dataset and System Testing.',
    icon: Check,
  },
];

const FAQ = ({ isDarkMode }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className={`min-h-screen py-16 px-4 ${isDarkMode ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            FAQ
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Everything you need to know about our waste classification system
          </p>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-16"
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVars}>
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className={`w-full text-left p-6 rounded-xl card-glow transition-all ${
                  activeIndex === index
                    ? isDarkMode
                      ? 'bg-purple-600/20 border-purple-500/50'
                      : 'bg-purple-100 border-purple-300'
                    : isDarkMode
                    ? 'bg-slate-800/30'
                    : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      size={24}
                      className={activeIndex === index ? 'text-purple-400' : 'text-slate-400'}
                    />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`p-6 rounded-b-xl ${
                      isDarkMode
                        ? 'bg-slate-800/20'
                        : 'bg-slate-50'
                    }`}>
                      <p className={`leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t transition-colors"
          style={{ borderTopColor: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0, 0, 0, 0.1)' }}
        >
          <h2 className="text-4xl font-bold gradient-text text-center mb-12">
            Our Team
          </h2>

          <motion.div
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVars}
                whileHover={{ y: -5 }}
                className={`card-glow p-6 rounded-xl text-center ${isDarkMode ? 'bg-slate-800/30' : 'bg-white'}`}
              >
                {/* Avatar placeholder */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
                  }`}
                >
                  <member.icon size={32} className="text-purple-400" />
                </motion.div>

                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-purple-400 font-semibold mb-2">{member.role}</p>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
# Waste Management System

An intelligent waste classification system that uses Deep Learning to automatically categorize waste into four distinct categories: Hazardous, Organic, Recyclable, and Non-Recyclable.

## Features

- **AI-Powered Classification**: Uses an ensemble model combining VGG16 and ResNet50 for accurate waste categorization
- **Interactive Web Interface**: Built with React.js for seamless user experience
- **Real-time Detection**: Upload images and get instant classification results
- **Responsive Design**: Works perfectly on all devices - desktop, tablet, and mobile
- **Comprehensive FAQ**: Detailed information about the system's functionality and technology

## Technology Stack

### Backend
- **Python Flask**: Web framework for API development
- **TensorFlow/Keras**: Deep learning framework for model training and inference
- **VGG16 + ResNet50**: Ensemble model architecture for superior accuracy

### Frontend  
- **React.js**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool for development
- **CSS3**: Responsive styling with media queries

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Usage

1. Start the backend server (Flask will run on http://localhost:5000)
2. Start the frontend development server (Vite will run on http://localhost:5173)
3. Navigate to the web application
4. Upload an image of waste material
5. Get instant classification results

## Model Architecture

The system uses an Ensemble Model that combines:
- **VGG16**: For texture analysis and edge detection
- **ResNet50**: For deep feature extraction and pattern recognition

This approach achieves higher accuracy than individual models by leveraging the strengths of both architectures.

## Waste Categories

1. **Hazardous**: Items that require special disposal (batteries, chemicals, etc.)
2. **Organic**: Biodegradable waste materials
3. **Recyclable**: Materials that can be processed and reused
4. **Non-Recyclable**: Items that go to general waste

## Future Enhancements

- Integration with IoT-enabled Smart Bins
- YOLO implementation for real-time multi-object detection
- Mobile application development
- Enhanced accuracy with larger datasets

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is developed as part of a final year project for educational purposes.
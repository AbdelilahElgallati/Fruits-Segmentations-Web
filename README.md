# Fruit Segmentation App

A React application with Tailwind CSS that uses the Roboflow API to perform object segmentation on images of fruits. Users can upload images via drag-and-drop or file selection, or provide an image URL. The app displays annotated images with segmentation polygons and class statistics.

## Features
- Upload images via drag-and-drop or file selection
- Submit image URLs
- Displays annotated images with segmentation polygons and labels
- Shows class statistics (e.g., number of apples, watermelons)
- Responsive design with Tailwind CSS
- Loading spinner and error handling
- Persists last result in localStorage

## Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fruit-segmentation-app
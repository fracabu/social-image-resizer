# Social Image Resizer

A modern web application designed to simplify the process of resizing and optimizing images specifically for various social media platforms. Built with React and TypeScript, this tool provides an intuitive interface, potentially leveraging AI capabilities through the Google Gemini API to ensure your visuals are perfectly tailored for sharing online.

## Key Features

*   **User-Friendly Interface**: Crafted with React for a responsive and seamless user experience, making image resizing straightforward.
*   **AI-Powered Image Optimization**: Integrates with the Google Gemini API, suggesting intelligent adjustments for image quality, content-aware cropping, or optimal dimensions.
*   **Social Media Presets**: Likely includes predefined dimensions and aspect ratios for popular platforms such as Instagram, Facebook, Twitter, LinkedIn, and more, streamlining your workflow.
*   **Robust Development**: Developed using TypeScript, ensuring type safety, better maintainability, and fewer runtime errors.

## Tech Stack

*   **Frontend Framework**: React
*   **Language**: TypeScript
*   **Build Tool**: Vite
*   **API Integration**: Google Gemini API

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
*   [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/getting-started/install)

### Installation

1.  **Clone the repository** (replace `your-username` with the actual repository owner if cloning from a specific source):
    ```bash
    git clone https://github.com/your-username/social-image-resizer.git
    cd social-image-resizer
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root of your project directory. This project requires a Google Gemini API key.

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```
Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key obtained from Google Cloud Console.

### Running the Project

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically be accessible in your web browser at `http://localhost:5173` (or another port specified by Vite if `5173` is in use).
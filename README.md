# Rentify

## Overview
Rentify is a sophisticated web application designed to simplify the rental process for both property owners and potential renters. It offers a seamless experience by providing an intuitive platform where property listings can be managed and searched efficiently. Key features of Rentify include property filtering, pagination, responsive design, property showcase, CRUD operations for property management, user authentication, and an integrated contact system. Automated email notifications further enhance the user experience by keeping all parties informed about important updates.

## Features
- **Property Filtering**: Users can filter properties based on various criteria such as location, price, size, and amenities.
- **Pagination**: Efficient navigation through property listings with pagination to enhance user experience.
- **Responsive Design**: The application is fully responsive, ensuring a smooth user experience across different devices.
- **Property Showcase**: Properties are presented with detailed information and high-quality images to attract potential renters.
- **CRUD Operations**: Property owners can Create, Read, Update, and Delete their property listings easily.
- **User Authentication**: Secure user authentication to manage access and ensure data privacy.
- **Contact System**: Integrated system for potential renters to contact property owners directly through the platform.
- **Automated Email Notifications**: Automatic email updates to keep users informed about inquiries, status changes, and other important events.

## Technologies and Packages Used

### Frontend
- **React**: For building user interfaces.
- **Next.js**: For server-side rendering and generating static websites.
- **Tailwind CSS**: For styling and designing responsive layouts.
- **Shadcn**: A set of UI components built with Tailwind CSS.

### Backend
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Nodemailer**: For sending emails.

### Authentication
- **NextAuth.js**: For handling authentication in Next.js applications.

### Form Handling
- **React Hook Form**: For managing form state and validation.
- **Zod**: For schema validation and type-safe forms.

### Utilities
- **Clsx**: A utility for constructing `className` strings conditionally.
- **Class-variance-authority**: For managing CSS class variations.
- **Tailwind Merge**: For merging Tailwind CSS classes.

### Miscellaneous
- **Lucide React**: Icon library for React.
- **Sonner**: Notification system.
- **Uploadthing**: For handling file uploads.

### Development
- **TypeScript**: For type safety and better code quality.
- **ESLint**: For linting and maintaining code quality.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

## Getting Started

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your machine.
- **npm**: Node package manager, usually installed with Node.js.

### Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/rentify.git
   cd rentify
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the necessary environment variables (e.g., database connection strings, email service credentials).

4. **Run the Application**:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

By following these steps, developers can set up Rentify on their local machine and start contributing or customizing it according to their needs. The use of modern technologies and best practices ensures that Rentify is both robust and scalable, making it a reliable solution for managing rental properties.


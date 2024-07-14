import './globals.css';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: 'EduGuard',
  description: 'AI Detection for Teachers',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>EduGuard</title>
        <meta name="description" content="AI Detection for Teachers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <header className="bg-indigo-600 dark:bg-indigo-700 text-white p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl">EduGuard</h1>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <footer className="bg-gray-800 dark:bg-gray-900 text-white p-4 mt-4 shadow-inner">
          <div className="container mx-auto text-center">
            &copy; {new Date().getFullYear()} EduGuard. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

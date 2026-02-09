import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RPMS - Remote Power Management System',
  description: '에이앤제이솔루션의 원격전원관리시스템',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

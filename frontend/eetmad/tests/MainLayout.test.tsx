import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from '../src/app/[locale]/(main)/layout';
import '@testing-library/jest-dom';

// Mock the Header and Sidebar components
jest.mock('@/components/shared/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Mock Header</div>;
  };
});

jest.mock('@/components/shared/Sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="mock-sidebar">Mock Sidebar</div>;
  };
});

describe('MainLayout', () => {
  it('renders header, sidebar, and children correctly', () => {
    render(
      <MainLayout>
        <div data-testid="child-content">Test Child Content</div>
      </MainLayout>
    );

    // Check if Header is rendered
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();

    // Check if Sidebar is rendered
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();

    // Check if children are rendered
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Child Content')).toBeInTheDocument();
  });
});

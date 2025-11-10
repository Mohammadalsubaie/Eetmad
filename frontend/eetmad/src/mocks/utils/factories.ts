/**
 * Data factories for generating mock data
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createMockUser(overrides?: any) {
  return {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    userType: 'client',
    ...overrides,
  };
}

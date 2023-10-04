jest.mock('mobx', () => ({
  ...jest.requireActual('mobx'),
  observable: jest.fn(() => ({})),
}));

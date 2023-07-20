beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Use jest.fn to track calls
      removeListener: jest.fn(), // Use jest.fn to track calls
    }));
});

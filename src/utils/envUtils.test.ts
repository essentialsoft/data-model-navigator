describe("getFilteredDataCommons cases", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();

    // Reset the environment variables back to their original values
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return an empty array when REACT_APP_HIDDEN_MODELS is not set", async () => {
    delete process.env.REACT_APP_HIDDEN_MODELS;

    const { getFilteredDataCommons } = await import("./envUtils");
    expect(getFilteredDataCommons()).toEqual([]);
  });

  it("should return an empty array when REACT_APP_HIDDEN_MODELS is not a string", async () => {
    process.env.REACT_APP_HIDDEN_MODELS = 0 as unknown as string; // NOTE: Officially only be strings

    const { getFilteredDataCommons } = await import("./envUtils");
    expect(getFilteredDataCommons()).toEqual([]);
  });

  it("should return an empty array when REACT_APP_HIDDEN_MODELS is an empty string", async () => {
    process.env.REACT_APP_HIDDEN_MODELS = "";

    const { getFilteredDataCommons } = await import("./envUtils");
    expect(getFilteredDataCommons()).toEqual([]);
  });

  it("should return an empty array when REACT_APP_HIDDEN_MODELS is an CSV of nothing", async () => {
    process.env.REACT_APP_HIDDEN_MODELS = ",,,";

    const { getFilteredDataCommons } = await import("./envUtils");
    expect(getFilteredDataCommons()).toEqual([]);
  });

  it("should return an array of hidden Data Commons when REACT_APP_HIDDEN_MODELS is set", async () => {
    process.env.REACT_APP_HIDDEN_MODELS = "dc1,dc2,dc3";

    const { getFilteredDataCommons } = await import("./envUtils");
    expect(getFilteredDataCommons()).toEqual(["dc1", "dc2", "dc3"]);
  });

  it("should return an array of 1 when REACT_APP_HIDDEN_MODELS is set to a single Data Commons", async () => {
    process.env.REACT_APP_HIDDEN_MODELS = "dc1";

    const { getFilteredDataCommons } = await import("./envUtils");
    expect(getFilteredDataCommons()).toEqual(["dc1"]);
  });

  it("should filter out empty Data Commons from the list", async () => {
    process.env.REACT_APP_HIDDEN_MODELS = "dc1,,dc3";

    const { getFilteredDataCommons } = await import("./envUtils");
    expect(getFilteredDataCommons()).toEqual(["dc1", "dc3"]);
  });
});

import { getResolvedPartition, PartitionHash } from "./getResolvedPartition";

describe(getResolvedPartition.name, () => {
  const mockRegion = "mockRegion";
  const mockPartition = "mockPartition";
  const mockHostname = "mockHostname";

  it("returns the partition if region is present in partitionHash", () => {
    const mockPartitionHash: PartitionHash = {
      [mockPartition]: {
        regions: [mockRegion, `${mockRegion}2`, `${mockRegion}3`],
        hostname: mockHostname,
      },
    };
    expect(getResolvedPartition(mockRegion, { partitionHash: mockPartitionHash })).toBe(mockPartition);
  });

  it("returns aws if region is not present in any partition", () => {
    const mockPartitionHash: PartitionHash = {
      [`${mockPartition}2`]: {
        regions: [`${mockRegion}2`, `${mockRegion}3`],
        hostname: mockHostname,
      },
    };
    expect(getResolvedPartition(mockRegion, { partitionHash: mockPartitionHash })).toBe("aws");
  });

  it("returns aws if partitionHash is empty", () => {
    expect(getResolvedPartition(mockRegion, { partitionHash: undefined })).toBe("aws");
  });
});

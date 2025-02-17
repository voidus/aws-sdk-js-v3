import { checkExceptions, createWaiter, WaiterConfiguration, WaiterResult, WaiterState } from "@aws-sdk/util-waiter";

import {
  DescribeReplicationInstancesCommand,
  DescribeReplicationInstancesCommandInput,
} from "../commands/DescribeReplicationInstancesCommand";
import { DatabaseMigrationServiceClient } from "../DatabaseMigrationServiceClient";

const checkState = async (
  client: DatabaseMigrationServiceClient,
  input: DescribeReplicationInstancesCommandInput
): Promise<WaiterResult> => {
  let reason;
  try {
    const result: any = await client.send(new DescribeReplicationInstancesCommand(input));
    reason = result;
    try {
      const returnComparator = () => {
        const flat_1: any[] = [].concat(...result.ReplicationInstances);
        const projection_3 = flat_1.map((element_2: any) => {
          return element_2.ReplicationInstanceStatus;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparator().length > 0;
      for (const element_4 of returnComparator()) {
        allStringEq_5 = allStringEq_5 && element_4 == "available";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS, reason };
      }
    } catch (e) {}
    try {
      const returnComparator = () => {
        const flat_1: any[] = [].concat(...result.ReplicationInstances);
        const projection_3 = flat_1.map((element_2: any) => {
          return element_2.ReplicationInstanceStatus;
        });
        return projection_3;
      };
      for (const anyStringEq_4 of returnComparator()) {
        if (anyStringEq_4 == "deleting") {
          return { state: WaiterState.FAILURE, reason };
        }
      }
    } catch (e) {}
    try {
      const returnComparator = () => {
        const flat_1: any[] = [].concat(...result.ReplicationInstances);
        const projection_3 = flat_1.map((element_2: any) => {
          return element_2.ReplicationInstanceStatus;
        });
        return projection_3;
      };
      for (const anyStringEq_4 of returnComparator()) {
        if (anyStringEq_4 == "incompatible-credentials") {
          return { state: WaiterState.FAILURE, reason };
        }
      }
    } catch (e) {}
    try {
      const returnComparator = () => {
        const flat_1: any[] = [].concat(...result.ReplicationInstances);
        const projection_3 = flat_1.map((element_2: any) => {
          return element_2.ReplicationInstanceStatus;
        });
        return projection_3;
      };
      for (const anyStringEq_4 of returnComparator()) {
        if (anyStringEq_4 == "incompatible-network") {
          return { state: WaiterState.FAILURE, reason };
        }
      }
    } catch (e) {}
    try {
      const returnComparator = () => {
        const flat_1: any[] = [].concat(...result.ReplicationInstances);
        const projection_3 = flat_1.map((element_2: any) => {
          return element_2.ReplicationInstanceStatus;
        });
        return projection_3;
      };
      for (const anyStringEq_4 of returnComparator()) {
        if (anyStringEq_4 == "inaccessible-encryption-credentials") {
          return { state: WaiterState.FAILURE, reason };
        }
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 * Wait until DMS replication instance is available.
 *  @deprecated Use waitUntilReplicationInstanceAvailable instead. waitForReplicationInstanceAvailable does not throw error in non-success cases.
 */
export const waitForReplicationInstanceAvailable = async (
  params: WaiterConfiguration<DatabaseMigrationServiceClient>,
  input: DescribeReplicationInstancesCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 60, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 * Wait until DMS replication instance is available.
 *  @param params - Waiter configuration options.
 *  @param input - The input to DescribeReplicationInstancesCommand for polling.
 */
export const waitUntilReplicationInstanceAvailable = async (
  params: WaiterConfiguration<DatabaseMigrationServiceClient>,
  input: DescribeReplicationInstancesCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 60, maxDelay: 120 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  return checkExceptions(result);
};

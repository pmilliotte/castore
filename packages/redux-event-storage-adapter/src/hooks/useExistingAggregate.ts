import {
  EventStore,
  EventStoreAggregate,
  EventStoreEventsDetails,
  GetAggregateOptions,
  AggregateNotFoundError,
} from '@castore/core';

import { useAggregate } from './useAggregate';

export const useExistingAggregate = <EVENT_STORE extends EventStore>(
  eventStore: EVENT_STORE,
  aggregateId: string,
  options: GetAggregateOptions = {},
): {
  aggregate: EventStoreAggregate<EVENT_STORE>;
  events: EventStoreEventsDetails<EVENT_STORE>[];
  lastEvent: EventStoreEventsDetails<EVENT_STORE>;
} => {
  const { aggregate, events, lastEvent } = useAggregate(
    eventStore,
    aggregateId,
    options,
  );

  if (aggregate === undefined || lastEvent === undefined) {
    throw new AggregateNotFoundError({
      eventStoreId: eventStore.eventStoreId,
      aggregateId,
    });
  }

  return { aggregate, events, lastEvent };
};

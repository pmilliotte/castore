import {
  Aggregate,
  EventDetail,
  EventStore,
  EventType,
  EventTypesDetails,
  Reducer,
  $Contravariant,
} from '@castore/core';
import { InMemoryStorageAdapter } from '@castore/inmemory-event-storage-adapter';

export class MockedEventStore<
  EVENT_STORE_ID extends string = string,
  EVENT_TYPES extends EventType[] = EventType[],
  EVENT_DETAIL extends EventDetail = EventTypesDetails<EVENT_TYPES>,
  $EVENT_DETAIL extends EventDetail = $Contravariant<EVENT_DETAIL, EventDetail>,
  REDUCER extends Reducer<Aggregate, $EVENT_DETAIL> = Reducer<
    Aggregate,
    $EVENT_DETAIL
  >,
  AGGREGATE extends Aggregate = ReturnType<REDUCER>,
> extends EventStore<
  EVENT_STORE_ID,
  EVENT_TYPES,
  EVENT_DETAIL,
  $EVENT_DETAIL,
  REDUCER,
  AGGREGATE
> {
  initialEvents: EVENT_DETAIL[];
  reset: () => void;

  constructor({
    eventStore,
    initialEvents = [],
  }: {
    eventStore: EventStore<
      EVENT_STORE_ID,
      EVENT_TYPES,
      EVENT_DETAIL,
      $EVENT_DETAIL,
      REDUCER,
      AGGREGATE
    >;
    initialEvents?: EVENT_DETAIL[];
  }) {
    super({
      eventStoreId: eventStore.eventStoreId,
      eventStoreEvents: eventStore.eventStoreEvents,
      reduce: eventStore.reduce,
      simulateSideEffect: eventStore.simulateSideEffect,
      storageAdapter: new InMemoryStorageAdapter({ initialEvents }),
    });

    this.initialEvents = initialEvents;
    this.reset = () =>
      (this.storageAdapter = new InMemoryStorageAdapter({ initialEvents }));
  }
}

using System;
using EPiServer.Data;
using EPiServer.Data.Dynamic;

namespace Geta.EPi.Tracking.Commerce
{
    [EPiServerDataStore(AutomaticallyCreateStore = true, AutomaticallyRemapStore = true, StoreName = "TrackingEvents")]
    public class TrackingEvent
    {
        public Identity Id { get; set; }

        [EPiServerDataIndex]
        public Guid ContentGuid { get; set; }

        [EPiServerDataIndex]
        public DateTime CreatedAt { get; set; }

        [EPiServerDataIndex]
        public TrackingEventType EventType { get; set; }
    }

    public enum TrackingEventType
    {
        ProductViewed
    }
}
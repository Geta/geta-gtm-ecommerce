using System;
using System.Linq;
using EPiServer.Data.Dynamic;

namespace Geta.EPi.Tracking.Commerce
{
    /// <summary>
    /// TODO refactor and use BoughtStats. For ProductListBlock.
    /// </summary>
    public class TrackingStats
    {
        private DynamicDataStore _store;
        protected DynamicDataStore Store
        {
            get { return _store ?? (_store = typeof(TrackingEvent).GetStore()); }
        }

        public static TrackingStats Current
        {
            get
            {
                return new TrackingStats();
            }
        }

        /// <summary>
        /// TODO refator and clean up so we don't have millions of records in the DB
        /// </summary>
        /// <param name="contentGuid"></param>
        /// <param name="eventType"></param>
        /// <returns></returns>
        public int GetCount(Guid contentGuid, TrackingEventType eventType)
        {
            return Store.Items<TrackingEvent>()
                .Count(x => x.CreatedAt > DateTime.UtcNow.AddMonths(-1)
                    && x.ContentGuid == contentGuid
                    && x.EventType == eventType);
        }
    }
}
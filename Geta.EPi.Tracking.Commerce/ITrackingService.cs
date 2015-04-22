using System;
using System.Collections.Generic;
using EPiServer.Commerce.Catalog.ContentTypes;

namespace Geta.EPi.Tracking.Commerce
{
    public interface ITrackingService
    {
        void Track(Guid contentGuid, TrackingEventType eventType);
        List<VariationContent> GetRecentlyViewedProducts(string language, string variantCodeToAdd);
    }
}
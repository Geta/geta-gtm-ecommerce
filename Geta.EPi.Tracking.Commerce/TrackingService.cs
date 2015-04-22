using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EPiServer;
using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Data.Dynamic;
using EPiServer.Logging;
using EPiServer.ServiceLocation;

namespace Geta.EPi.Tracking.Commerce
{
    /// <summary>
    /// TODO refactor to use cookie instead of Session. Maybe something we can use built in? Google Analytics?
    /// </summary>
    [ServiceConfiguration(typeof(ITrackingService))]
    public class TrackingService : ITrackingService
    {
        private readonly ILogger _logger;
        private readonly IContentLoader _contentLoader;

        public TrackingService(ILogger logger, IContentLoader contentLoader)
        {
            this._logger = logger;
            this._contentLoader = contentLoader;
        }

        private const string SessionKeyFormat = "{0}_{1}";

        private DynamicDataStore _store;
        protected DynamicDataStore Store
        {
            get { return _store ?? (_store = typeof(TrackingEvent).GetStore()); }
        }

        public List<VariationContent> GetRecentlyViewedProducts(string language, string variantGuidToAdd)
        {
            const int listLimit = 10;
            const int storageLimit = listLimit + 1;

            List<string> variantCodes = RecentlyViewedProductsCookieHelper.AddVariantToCookieAndGetVariantsFromCookie(language, variantGuidToAdd, storageLimit);

            var variants = new List<VariationContent>();

            if (variantCodes == null)
            {
                return variants;
            }

            foreach (string variantGuid in variantCodes.Where(v => v != variantGuidToAdd).Take(listLimit))
            {
                if (string.IsNullOrEmpty(variantGuid))
                {
                    continue;
                }

                var variant = this._contentLoader.Get<VariationContent>(new Guid(variantGuid));

                variants.Add(variant);
            }

            return variants;
        }

        public void Track(Guid contentGuid, TrackingEventType eventType)
        {
            if (Tracked(contentGuid, eventType))
            {
                return;
            }

            var trackingEvent = new TrackingEvent
            {
                ContentGuid = contentGuid,
                CreatedAt = DateTime.UtcNow,
                EventType = eventType
            };

            try
            {
                Store.Save(trackingEvent);
            }
            catch (InvalidOperationException ex)
            {
                this._logger.Error("Error in TrackinService", ex);
            }

            MarkAsTracked(contentGuid, eventType);
        }

        private void MarkAsTracked(Guid contentGuid, TrackingEventType eventType)
        {
            var key = GetSessionKey(contentGuid, eventType);
            HttpContext.Current.Session[key] = "tracked";
        }

        private bool Tracked(Guid contentGuid, TrackingEventType eventType)
        {
            var key = GetSessionKey(contentGuid, eventType);

            var tracked = HttpContext.Current.Session[key] as string;
            return tracked != null;
        }

        private static string GetSessionKey(Guid contentGuid, TrackingEventType eventType)
        {
            return string.Format(SessionKeyFormat, contentGuid, eventType);
        }
    }
}
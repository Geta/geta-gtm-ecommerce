using System;
using System.Web.Mvc;
using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Core;

namespace Geta.EPi.Tracking.Commerce.Filters
{
    /// <summary>
    /// TODO consider making this async
    /// </summary>
    public class TrackingFilterAttribute : ActionFilterAttribute
    {
        private readonly ITrackingService _trackingService;

        public TrackingFilterAttribute()
        {
        }

        public TrackingFilterAttribute(ITrackingService trackingService)
        {
            this._trackingService = trackingService;
        }

        public VariationContent CurrentContent { get; set; }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);

            // ReSharper disable once SuspiciousTypeConversion.Global
            if (!(filterContext.Controller is IShouldTrack))
            {
                return;
            }

            var currentContent = filterContext.HttpContext.Items["CurrentContent"] as IContent;

            if (currentContent == null)
            {
                throw new ArgumentException("CurrentContent is missing. Should be passed using HttpContext.Items[\"CurrentContent\"]");
            }

            _trackingService.Track(currentContent.ContentGuid, TrackingEventType.ProductViewed);
        }
    }
}
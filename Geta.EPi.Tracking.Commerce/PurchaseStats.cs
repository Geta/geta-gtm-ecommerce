using System;
using System.Linq;
using Mediachase.Commerce.Orders;

namespace Geta.EPi.Tracking.Commerce
{
    public class PurchaseStats
    {
        public static PurchaseStats Current
        {
            get
            {
                return new PurchaseStats();
            }
        }

        public int GetCount(Mediachase.Commerce.Catalog.Objects.Entry entry)
        {
            var monthAgo = DateTime.UtcNow.AddMonths(-1);
            var orders = OrderContext.Current.FindPurchaseOrdersByStatus();

            return orders
                .Where(order => order.Created > monthAgo)
                .SelectMany(order => order.OrderForms[0].LineItems)
                .Where(item => item.CatalogEntryId == entry.ID)
                .Select(item => Convert.ToInt32(item.Quantity))
                .Sum();
        }
    }
}
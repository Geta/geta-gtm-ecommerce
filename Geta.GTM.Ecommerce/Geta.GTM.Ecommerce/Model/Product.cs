using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Geta.GTM.Ecommerce.Model
{
    public class Product
    {
        /// <summary>
        /// The product ID or SKU (e.g. P67890). *Either this field or name must be set.
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// The name of the product (e.g. Android T-Shirt). *Either this field or id must be set.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The category to which the product belongs (e.g. Apparel). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Apparel/Men/T-Shirts).
        /// </summary>
        public string Category { get; set; }

        /// <summary>
        /// The variant of the product (e.g. Black).
        /// </summary>
        public string Variant { get; set; }

        /// <summary>
        /// The product's position in a list or collection (e.g. 2).
        /// </summary>
        public int Position { get; set; }

        /// <summary>
        /// The quantity of a product (e.g. 2) when added to the cart
        /// </summary>
        public int Quantity { get; set; }
    }
}

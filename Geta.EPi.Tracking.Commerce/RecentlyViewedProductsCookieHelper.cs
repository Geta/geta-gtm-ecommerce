using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Geta.EPi.Tracking.Commerce
{
    public static class RecentlyViewedProductsCookieHelper
    {
        private const char ValueSeparator = ' ';

        private const string CookieCollectionKeyBase = "RecentlyViewedProducts-";

        public static List<string> AddVariantToCookieAndGetVariantsFromCookie(string language, string variantCodeToAdd, int storageLimit)
        {
            List<string> variantCodes = GetDeserializedVariantCodesFromCookie(language);

            InsertOrPromoteVariantCodeToTopOfList(variantCodes, variantCodeToAdd);

            CutOffListByStorageLimit(variantCodes, storageLimit);

            string serializedVariantCodes = SerializeVariantCodes(variantCodes);

            SetVariantCodesInCookie(language, serializedVariantCodes);

            return variantCodes;
        }

        private static string SerializeVariantCodes(IEnumerable<string> variantCodes)
        {
            var sb = new StringBuilder();
            bool isFirstElement = true;
            foreach (string code in variantCodes)
            {
                if (isFirstElement)
                    isFirstElement = false;
                else
                    sb.Append(ValueSeparator);
                sb.Append(code);
            }
            return sb.ToString();
        }

        private static void InsertOrPromoteVariantCodeToTopOfList(IList<string> variantCodes, string variantGuid)
        {
            // Remove if already in list
            if (variantCodes.Contains(variantGuid))
                variantCodes.Remove(variantGuid);

            // Insert at top of list
            variantCodes.Insert(0, variantGuid);
        }

        // Note: only removes the bottom element of the list
        private static void CutOffListByStorageLimit(IList variantCodes, int storageLimit)
        {
            if (variantCodes.Count > storageLimit)
                variantCodes.RemoveAt(variantCodes.Count - 1);
        }

        private static List<string> GetDeserializedVariantCodesFromCookie(string language)
        {
            string serializedCodes = GetValueFromCookie(language);

            string[] deserializedCodes = !string.IsNullOrEmpty(serializedCodes)
                                             ? serializedCodes.Split(ValueSeparator)
                                             : new string[0];

            List<string> variantCodesInCookie = deserializedCodes.Any()
                                                    ? deserializedCodes.ToList()
                                                    : new List<string>();
            return variantCodesInCookie;
        }

        private static string GetValueFromCookie(string language)
        {
            string key = CookieCollectionKeyBase + language;
            string value = HttpContext.Current.Request.Cookies[key] != null
                               ? HttpContext.Current.Request.Cookies[key].Value
                               : string.Empty;
            return value;
        }

        private static void SetVariantCodesInCookie(string language, string value)
        {
            HttpContext.Current.Response.Cookies.Remove(CookieCollectionKeyBase + language);

            var cookie = new HttpCookie(CookieCollectionKeyBase + language)
            {
                Value = value,
                Expires = DateTime.Now.AddDays(1d)
            };
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}
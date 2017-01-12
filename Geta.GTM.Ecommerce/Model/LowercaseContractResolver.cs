using Newtonsoft.Json.Serialization;

namespace Geta.GTM.Ecommerce.Model
{
    public class LowercaseContractResolver : DefaultContractResolver
    {
        protected override string ResolvePropertyName(string key)
        {
            return key.ToLower();
        }
    }
}
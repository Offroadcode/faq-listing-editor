namespace FAQPackage
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    /// <summary>
    /// FAQItem is a FAQ Item.
    /// </summary>
    public class FAQItem
    {
        [JsonProperty("question")]
        public string Question { get; set; }

        [JsonProperty("answer")]
        public IHtmlString Answer { get; set; }

        [JsonProperty("categories")]
        public IEnumerable<string> Categories { get; set; }

        public static FAQItem Deserialize(string json)
        {
            // Validate the JSON
            if (json == null || !json.StartsWith("{") || !json.EndsWith("}"))
            {
                return null;
            }

            // Deserialize the JSON
            var jobj = (JProperty)JsonConvert.DeserializeObject(json);
            return new FAQItem()
            {
                Question = (string)jobj.Value["question"],
                Answer = MvcHtmlString.Create(jobj.Value<string>("answer")),
                Categories = jobj.Value["categories"].ToObject<string[]>()
            };
        }
    }
}

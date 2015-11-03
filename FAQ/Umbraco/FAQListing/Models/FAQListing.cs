namespace FAQ
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    /// <summary>
    /// The faq listing.
    /// </summary>
    public class FAQListing
    {
        /// <summary>
        /// Gets or sets the FAQ items.
        /// </summary>
        [JsonProperty("items")]
        public IEnumerable<FAQItem> Items { get; set; }

        /// <summary>
        /// Gets or sets the categories.
        /// </summary>
        [JsonProperty("categories")]
        public IEnumerable<string> Categories { get; set; }

        /// <summary>
        /// Deserializes the JSON into the FAQ Listing.
        /// </summary>
        /// <param name="json">
        /// The json <see cref="string"/>.
        /// </param>
        /// <returns>
        /// The <see cref="FAQListing"/>.
        /// </returns>
        public static FAQListing Deserialize(string json)
        {
            // Validate the JSON
            if (json == null || !json.StartsWith("{") || !json.EndsWith("}"))
            {
                return null;
            }

            // Deserialize the JSON
            var jobj = (JObject)JsonConvert.DeserializeObject(json);
            var items = jobj.GetValue("items").Cast<JObject>().Select(j => new FAQItem()
                {
                    Question = j.Value<string>("question"),
                    Answer = MvcHtmlString.Create(j.Value<string>("answer")),
                    Categories = j.Value<JArray>("categories").ToObject<string[]>()
                });

            return new FAQListing()
                       {
                           Items = items,
                           Categories = jobj.Value<JArray>("categories").ToObject<string[]>()
                       };
        }
    }
}

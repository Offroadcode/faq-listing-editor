namespace FAQ
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
        /// <summary>
        /// Gets or sets the question.
        /// </summary>
        [JsonProperty("question")]
        public string Question { get; set; }

        /// <summary>
        /// Gets or sets the answer.
        /// </summary>
        [JsonProperty("answer")]
        public IHtmlString Answer { get; set; }

        /// <summary>
        /// Gets or sets the categories.
        /// </summary>
        [JsonProperty("categories")]
        public IEnumerable<string> Categories { get; set; }

        /// <summary>
        /// Deserializes the json into an FAQ Item.
        /// </summary>
        /// <param name="json">
        /// The json <see cref="string"/>.
        /// </param>
        /// <returns>
        /// The <see cref="FAQItem"/>.
        /// </returns>
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

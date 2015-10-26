
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

    [JsonProperty("items")]
    public IEnumerable<FAQItem> Items { get; set; }

    [JsonProperty("categories")]
    public IEnumerable<string> Categories { get; set; }

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
                Categories = j.Value<JArray>("categories").ToString().Split(',').ToList()
            });
        return new FAQListing()
                   {
                       Items = items,
                       Categories = jobj.Value<JArray>("categories").ToString().Split(',')
                   };
    }
}

using RealGadget.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RealGadget.Controllers
{
   [Authorize(Roles="Admin")]
    public class AdminController : ApiController
    {

        public byte[] buffer = new byte[10000];
        public string productname;
        public int productprice;
        public string productdesc;
        public string categoryname;
        public int categoryId;
        public string other;
        private RealGadgetContext db = new RealGadgetContext();
        [HttpPost]
        [Route("api/categoryupload")]
        public async Task<IHttpActionResult> CatUpload()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            string root = System.Web.HttpContext.Current.Server.MapPath("~/locker");

            var provider = new MultipartFormDataStreamProvider(root);

            await Request.Content.ReadAsMultipartAsync(provider);
            foreach (var key in provider.FormData.AllKeys)
            {
                foreach (var val in provider.FormData.GetValues(key))
                {
                    if (key == "name")
                    {
                        categoryname = val;
                    }

                }
            }
            db.Categories.Add(new Category { Name=categoryname});
            db.SaveChanges();

            return Ok();

        }
      
        [HttpPost]
        [Route("api/imageupload")]
        public async Task<IHttpActionResult> Upload()
        {

            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            string root = System.Web.HttpContext.Current.Server.MapPath("~/locker");

            var provider = new MultipartFormDataStreamProvider(root);

            await Request.Content.ReadAsMultipartAsync(provider);

            foreach (var file in provider.FileData)
            {
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                buffer = File.ReadAllBytes(file.LocalFileName);
              }


            foreach (var key in provider.FormData.AllKeys)
            {
                foreach (var val in provider.FormData.GetValues(key))
                {
                    if (key == "name")
                    {
                        productname = val;
                    }

                    else if (key == "price")
                    {
                        productprice = int.Parse(val);
                    }
                    else if(key=="categoryid")
                    {
                        categoryId = int.Parse(val);
                    }
                 
                    else 
                    {
                        productdesc = val;

                    }
                 

                }
            }



            db.Gadgets.Add(new Gadget() { Name= productname,Price= productprice, Description = productdesc,CategoryID=categoryId,Image= buffer });
            db.SaveChanges();
            return Ok();

        }
    }
}

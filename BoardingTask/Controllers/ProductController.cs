using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BoardingTask.Models;
using Newtonsoft.Json;

namespace BoardingTask.Controllers
{
    public class ProductController : Controller
    {

        OnBoardingDBEntities1 db = new OnBoardingDBEntities1();
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }
        //Product List
        public JsonResult GetProductList()
        {

            var data = db.Products.Select(x => new ProductModel
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
            }).ToList();
            

            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

      
        //Create
        public JsonResult CreateProduct(Product c)
        {


            db.Products.Add(c);
            db.SaveChanges();

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //public JsonResult GetDeleteProduct(int id)
        //{


        //    var Product = db.Products.Where(x => x.Id == id).SingleOrDefault();
        //    string value = JsonConvert.SerializeObject(Product, Formatting.Indented, new JsonSerializerSettings
        //    {
        //        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        //    });

        //    return new JsonResult { Data = value, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        //}
        public JsonResult DeleteProduct(int id)
        {


            var Product = db.Products.Where(x => x.Id == id).SingleOrDefault();
            


            if (Product != null)
            {
                  
                if (Product.Sales.Count == 0)
                {
                    db.Products.Remove(Product);
                    db.SaveChanges();

                }
                else
                {
                   var sales = db.Sales.Where(x => x.ProductId == id).ToList();

                    foreach (var sale in sales)
                    {
                          //deleting corresponding sales record
                            db.Sales.Remove(sale);
                            db.SaveChanges();
                    }
                            //then deleting product record
                            db.Products.Remove(Product);
                            db.SaveChanges();
                        
                    
                    
                }

            }



            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        //Edit
        public JsonResult GetEdit(int id)
        {


            var Product = db.Products.Where(x => x.Id == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(Product, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return new JsonResult { Data = value, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult Edit(Product c)
        {


            var Product = db.Products.Where(x => x.Id == c.Id).SingleOrDefault();
            Product.Id = c.Id;
            Product.Name = c.Name;
            Product.Price = c.Price;
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


    }
}
    
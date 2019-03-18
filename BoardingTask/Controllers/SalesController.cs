using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BoardingTask.Models;
using Newtonsoft.Json;

namespace BoardingTask.Controllers
{
    public class SalesController : Controller
    {
        OnBoardingDBEntities1 db = new OnBoardingDBEntities1();
        // GET: Sales
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetSalesList()
        {
           
            var saleList = db.Sales.Select(s => new
            {
                Id = s.Id,
                DateSold = s.DateSold,
                CustomerName = s.Customer.Name,
                ProductName = s.Product.Name,
                StoreName = s.Store.Name

            }).ToList();
            return new JsonResult { Data = saleList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult CustomerList()
        {
           
            var Customerdata = db.Customers.Select(p => new { Id = p.Id, CustomerName = p.Name }).ToList();

            return new JsonResult { Data = Customerdata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }



        public JsonResult ProductList()
        {
          

            var ProductsData = db.Products.Select(p => new { Id = p.Id, ProductName = p.Name }).ToList();

            return new JsonResult { Data = ProductsData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


        public JsonResult StoreList()
        {
           
            var StoresData = db.Stores.Select(p => new { Id = p.Id, StoreName = p.Name }).ToList();

            return new JsonResult { Data = StoresData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }





        //Create
        public JsonResult CreateSale(Sale s)
        {

            
            db.Sales.Add(s);
            db.SaveChanges();

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //delete
        public JsonResult DeleteSale(int id)
        {
          
            var sales = db.Sales.Where(x => x.Id == id).SingleOrDefault();
            if (sales != null)
            {
                db.Sales.Remove(sales);
                db.SaveChanges();
            }

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult GetEdit(int id)
        {
           
            Sale sale = db.Sales.Where(x => x.Id == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(sale, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return new JsonResult { Data = value, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult Edit(Sale s)
        {
            {
                try
                {
                     
                    Sale sales = db.Sales.Where(x => x.Id == s.Id).SingleOrDefault();


                    sales.CustomerId = s.CustomerId;
                    sales.ProductId = s.ProductId;
                    sales.StoreId = s.StoreId;
                    sales.DateSold = s.DateSold;

                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    Console.Write(e.Data + "Exception Occured");
                    return new JsonResult { Data = "Sale Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }

                return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
        }
    }
}
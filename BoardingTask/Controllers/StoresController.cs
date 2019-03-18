using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BoardingTask.Models;
using Newtonsoft.Json;

namespace BoardingTask.Controllers
{
    public class StoresController : Controller
    {
        OnBoardingDBEntities1 db = new  OnBoardingDBEntities1();
        // GET: Stores
        public ActionResult Index()
        {
            return View();
        }
        //Get StoresList
        public JsonResult GetStoresList()
        {
            var data = db.Stores.Select(x => new StoreModel
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address
            }).ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        //Create
        public JsonResult CreateStore(Store c)
        {


            db.Stores.Add(c);
            db.SaveChanges();

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //public JsonResult GetDeleteStore(int id)
        //{


        //    var Store = db.Stores.Where(x => x.Id == id).SingleOrDefault();
        //    string value = JsonConvert.SerializeObject(Store, Formatting.Indented, new JsonSerializerSettings
        //    {
        //        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        //    });

        //    return new JsonResult { Data = Store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        //}
        public JsonResult DeleteStore(int id)
        {


            var Store = db.Stores.Where(x => x.Id == id).SingleOrDefault();
           
            if (Store != null)
            {
                if (Store.Sales.Count == 0)
                {
                    db.Stores.Remove(Store);
                    db.SaveChanges();

                }
                else
                {
                    var Sales = db.Sales.Where(x => x.StoreId == id).ToList();

                    foreach( var sale in Sales)
                    {
                        //deleting corresponding sales record
                        db.Sales.Remove(sale);
                        db.SaveChanges();
                    }
                    //then deleting store record
                    db.Stores.Remove(Store);
                    db.SaveChanges();
                }

            }

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        //Edit
        public JsonResult GetEdit(int id)
        {


            var Store = db.Stores.Where(x => x.Id == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(Store, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return new JsonResult { Data = Store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult Edit(Customer c)
        {


            var Store = db.Stores.Where(x => x.Id == c.Id).SingleOrDefault();
            Store.Id = c.Id;
            Store.Name = c.Name;
            Store.Address = c.Address;
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


    }
}
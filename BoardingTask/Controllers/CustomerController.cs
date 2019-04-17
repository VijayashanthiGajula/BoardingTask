using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BoardingTask.Models;
using Newtonsoft.Json;

namespace BoardingTask.Controllers
{
    public class CustomerController : Controller
    {
        public OnBoardingDBEntities1 db = new OnBoardingDBEntities1();
        

        public ActionResult Index()
                       
        {
           
                return View();
            
        }
        //customerList
        public JsonResult GetCustomerList()
        {
            
              //creating object of customer model to hold the values globally
                var data = db.Customers.Select(x => new  
                {
                    Id = x.Id,
                    Name = x.Name,
                    Address = x.Address
                    
                }).ToList();
           
            
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            
        }
        //Create
        public JsonResult CreateCustomer(Customer c)
        {

           
            db.Customers.Add(c);
            db.SaveChanges();

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        
        public JsonResult GetDeleteCustomer(int id)
        {

          
            var customer = db.Customers.Where(x => x.Id == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(customer, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            //   return Json(value, JsonRequestBehavior.AllowGet);
            return new JsonResult { Data = value, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult DeleteCustomer(int id)
        {


            var customer = db.Customers.Where(x => x.Id == id).SingleOrDefault();
            if (customer != null)
            {
                if (customer.Sales.Count == 0)
                {
                    db.Customers.Remove(customer);
                    db.SaveChanges();

                }
                else
                {
                    var sales = db.Sales.Where(x => x.CustomerId == id).ToList();

                    foreach (var sale in sales)
                    {
                        //deleting corresponding sales record
                        db.Sales.Remove(sale);
                        db.SaveChanges();
                    }
                    db.Customers.Remove(customer);
                    db.SaveChanges();
                }
            }
                        
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        //Edit
        public JsonResult GetEdit(int id)
        {

           
            var customer = db.Customers.Where(x => x.Id == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(customer, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return new JsonResult { Data = value, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult Edit(Customer c)
        {

           
            var cust = db.Customers.Where(x => x.Id == c.Id).SingleOrDefault();
            cust.Id = c.Id;
            cust.Name = c.Name;
            cust.Address = c.Address;
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }







    }
}
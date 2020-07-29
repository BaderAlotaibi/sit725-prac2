
/*


This code for both sub-tasks 1 and 2 on pracs ,
 and Task 2.1 and 2.2 on the ontrack

 task 2.1 is retriving data stored into an array
 task 2.2 is an HD task and used for retriving data from linked list 
 To be able to run this code , we will use port 3000 for our server 
 
 please see these links as samples:

 adding two function
 http://localhost:3000/adder?num1=20&num2=30 


retrieving a specific account from an array
http://localhost:3000/Account?id=2  

retrieving a specific account from linked List :
 http://localhost:3000/linkedlist?id=3      


*/ 




// import  package
//importing the libraries that we want
const express = require('express');

//create an instance of express
let app = express();


//Running node as a web server for hosting static files 
app.use(express.static('public'));


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(request,response){
    response.send(' Hello World, Bader');
})


// function  for adding two numbers together.
let addition = function(num1,num2) {
    let result = num1 + num2;
    return result;
}



//  an end point to add two numbers.
app.get('/adder', function(req,res){
    let number1=parseInt(req.query.num1);
    let number2=parseInt(req.query.num2);

   let myResult = addition(number1,number2);
   //res.send('The Result of adding : ' +number1 + ' with ' + number2 + ' is = ' +myResult);
   res.json({Result: myResult});

} )


 let accounts =[
    { id: 1 , name: 'alex' , deposit: 5 },
    { id: 2 , name: 'sarah' , deposit: 5 },
    { id: 3 , name: 'jim' , deposit: 15 }
    ]


    // a fucntion that return a specific record from Accounts Array if found
    let findRecord = function(id,res) {
          // Searching records for the id
        for (let record of accounts)
        {
              //compare the current record.id with the given id 
            if (record.id == id)
                return record ;     //return the record if match                 
        }
        // Sending 404 when the request is not found 
        return res.status(404).send('Sorry..! Not Found .');
          
    }
  


    // Task 2.1 REst APi
    // To use it , please use this address or link :

     // http://localhost:3000/account?id=xxx


  // a GET end point that retrieves data stored into an array. 
    app.get('/account',function(request,response){
        let id = request.query.id;
        let record =findRecord(id,response);
        response.json({ResultFromArray: record});

    })






/* 
        This is For HD Task 2.2

        To open this End point and retrive a data for specific account , Please use this address

http://localhost:3000/linkedlist?id=xxx
where xxx is the id number .



why you would use a linkedlist instead of an array ?

There are two major and outstanding reasons for using a Linkedlist over an array :

1- The dynamic size . in detail , linked list are sequential access memory  based  unlike  
 array  which has a direct access of memory.  Linked list is sufficient when it comes to use
 memory wisely . it is consists of nodes connected to each other via a pointer , so any new node
 can be alocated in any space in the memory and get pointed by a pointer from the last node " tail node"
in the linled list. 
In opposite , the array has a fixed size in the memory and also if we need to add a new value
we need to allocate the hole address space for the array in the memory , which is insufficient in comaprison
to linked list. 

 2- the ease of both deletion and insertion : when we need to add a node , we just allocate and store this node or element in anywhere in the memory
 and having the last element of the linked list pointed to it .
 in terms of deletion : we only broke the pinter that linked the other nodes to this node that is gonna be deleted. 



*/
    

    
class LinkedList{
    constructor(){
        // Linkedlist  is empty by default so I set them to Null
        this.head=null ; // 
        this.tail=null;
    }

  
/*  search and retrieve the data of node based on the given id
if it match return it
 I have created an object to represent the current Node
  and it will start with the first node which is this.head */

 search (id, response){
     let currentNode=this.head;
     
    while (currentNode){
    
        if (currentNode.id== id) {
            let Data = {id: currentNode.id , name: currentNode.name , deposit: currentNode.deposit}
            return Data;
        }
        else 
        // move to the next node if it there is no matching
        currentNode=currentNode.next;   
    }
    
        // it will return this message if record Not Found.    
     return response.status(404).send('Sorry, NOT found ..! ');
    
    }


    insertNode(Record) {
        // creating a new instance of  node and pass the data to it using Node class
        let newNode = new Node(Record);

// if list is empty (there is no node)
        if (!this.tail){
           this.head= this.tail=newNode;
       } else {
       // adding the new node to the end 
        let oldTail = this.tail;
        this.tail= newNode;
        oldTail.next=this.tail;
              
       }
    }
    

}


class Node {
    // taking the data passed in and  set it to the data property
    // set the next to null as node we added is the tail.
    constructor(nodeData,next=null) {
    
    this.id=nodeData.id;
    this.name = nodeData.name;
    this.deposit = nodeData.deposit;
    this.next= next  ;

}}




let list=new LinkedList();



let acc1=  { id: 1 , name: 'Alex' , deposit: 5 }; //first node data
let acc2 = { id: 2 , name: 'Sarah' , deposit: 5 }; // seond node data
let acc3={ id: 3 , name: 'Jim' , deposit: 15 };   // third node data

// Insert every Node to the linked list with its data
list.insertNode (acc1); 
list.insertNode (acc2);
list.insertNode (acc3);




  // a GET end point that retrieves data stored into an Linked List. 
app.get('/linkedList',function(request,response){
    let id = request.query.id;
    let record= list.search(id,response);

    response.json({record});

    
})



//start the server on port 3000
    app.listen(3000);






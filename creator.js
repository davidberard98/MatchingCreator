
function loaded()
{
 document.getElementById("countEntries").value=0;
 document.getElementById("errorcolor").value = "red";
}

function bgcol()
{
 document.body.style.backgroundColor = (document.getElementById("bgcolor").value);
}

function txtcol()
{
 document.body.style.color = (document.getElementById("txtcolor").value);
}

function errorcol()
{
 document.getElementById("errorbox").style.backgroundColor = (document.getElementById("errorcolor").value);
}

function addEntry()
{
 var entrycount = document.getElementById('countEntries').value;
 ++entrycount;
 document.getElementById("countEntries").value = entrycount;
// alert("here");
 var table=document.getElementById("mytable");
 var row=table.insertRow(entrycount);
 var cell1 = row.insertCell(0);
 var cell2 = row.insertCell(1);
 cell1.innerHTML = "<input type=\"text\" style=\"width:140px\" id=\"t_" + entrycount + "\" />";
 cell2.innerHTML = "<input type=\"text\" style=\"width:440px\" id=\"d_" + entrycount + "\" />";
}

function reorder_array(input)
{
 for(var i=input.length-1;i>0;i--)
 {
  var j=Math.floor(Math.random()*(i+1));
  var temp = input[i];
  input[i] = input[j];
  input[j] = temp;
 }
 return input;
}

function create_styles()
{
 var output= "<style>\nbody\n{\n";
 output += "background-color:" + document.getElementById("bgcolor").value + ";\n";
 output += "color:" + document.getElementById("txtcolor").value + ";\n}\ndiv.tablecont\n{\n";
 output += "border: 1px solid " + document.getElementById("txtcolor").value + ";\n}\n</style>\n";
 return output;
}

function javascriptpls(noms, defs, nomOrder, defOrder)
{
 var countEntries = parseInt(document.getElementById("countEntries").value);
 var output = "";
 output += "<script type = \"text/javascript\">\nfunction clear_all()\n{\n"
 output += "var allAttributes=[";
 for(var i=0;i<countEntries;++i)
 {
 output += "\""+String.fromCharCode(65+i)+"\"";
 if(i < countEntries-1)
  output += ", ";
 }
 output += "];\n";
 output += "for(var i=0;i<allAttributes.length;++i)\n{\ndocument.getElementById(allAttributes[i]+\"_out\").value=\"\";\ndocument.getElementById(allAttributes[i]+\"_in\").value=\"\";\ndocument.getElementById(allAttributes[i]+\"_ta\").style.backgroundColor=\"transparent\";\ndocument.getElementById(allAttributes[i]+\"_tb\").style.backgroundColor=\"transparent\";\ndocument.getElementById(allAttributes[i]+\"_tc\").style.backgroundColor=\"transparent\";\n}\n}\n";
 output += "function return_ans(input)\n{\nvar ans = [];\n";
 for(var i=0;i<countEntries;++i)
 {
  var answer = nomOrder.indexOf(defOrder[i])+1;
  output += "ans['" + String.fromCharCode(65+i) + "'] = " + answer + ";\n";
 }
 output += "return ans[input];\n}\n";

 // "return_name"
 output += "function return_name(input)\n{\nvar nom=[];\n";
 for(var i=0;i<countEntries;++i)
 {
  output += "nom[" + (i+1) + "] = \"";
  output += noms[nomOrder[i]+1];
  output += "\";\n";
 }
 output += "return nom[input];\n}\n";

 //checkans
 output += "function checkans(a)\n{\nvar idClass = a.id.substr(0, a.id.length-3);\nif(return_ans(idClass) == a.value)\n{\ndocument.getElementById(idClass+\"_out\").value=return_name(return_ans(idClass));\ndocument.getElementById(idClass+\"_ta\").style.backgroundColor=\"transparent\";\ndocument.getElementById(idClass+\"_tb\").style.backgroundColor=\"transparent\";\ndocument.getElementById(idClass+\"_tc\").style.backgroundColor=\"transparent\";\n}\n";
 output += "else\n{\ndocument.getElementById(idClass+\"_out\").value=\"\";\n";
 output += "document.getElementById(idClass+\"_ta\").style.backgroundColor=\"" + document.getElementById("errorcolor").value + "\";\n";
 output += "document.getElementById(idClass+\"_tb\").style.backgroundColor=\"" + document.getElementById("errorcolor").value + "\";\n";
 output += "document.getElementById(idClass+\"_tc\").style.backgroundColor=\"" + document.getElementById("errorcolor").value + "\";\n";
 output += "}\n}\n</script>\n";


 return output;
}

function create()
{
 var countEntries = parseInt(document.getElementById("countEntries").value);
 var output;
 output="<!DOCTYPE html PUBLIC>\n<html>\n<head>\n<link rel=\"stylesheet\" type=\"text/css\" href=\"matching.css\" />\n";
 output += "<title>" + document.getElementById("titlename").value +"</title>";
 output += create_styles();
 //var chr = String.fromCharCode(64+n);
  var noms = [];
  noms[0] = "placeholder";
  var defs = [];
  defs[0] = "placeholder(def)";
  var nomOrder = [];
  var defOrder = [];
  for(var i=1;i<=parseInt(document.getElementById("countEntries").value);++i)
  {
   noms[i]=document.getElementById("t_"+i).value;
   defs[i]=document.getElementById("d_"+i).value;
  // output += noms[i] + " -> " + defs[i] + "\n"; 
   nomOrder[i-1] = i-1;
   defOrder[i-1] = i-1;
  }
  nomOrder = reorder_array(nomOrder); // remember to +1
  defOrder = reorder_array(defOrder); // remember to +1
 output += javascriptpls(noms, defs, nomOrder, defOrder);
 output += "</head>\n<body onLoad=\"clear_all();\">\n";
 output += "<div class = \"contain\">\n<h1>" + document.getElementById("titlename").value + "</h1>\n<div class=\"indentabit\">\n<div class=\"tablecont\" style=\"width:520px;font-weight:900;\">\n<span class=\"center\">WORD BANK</span>\n"
 for(var i=0;i<countEntries;++i)
 {
  output += (i+1) + ". " + noms[nomOrder[i]+1];
  if(i < countEntries-1)
   output += "<br />";
  output += "\n";
 }
 output += "</div>\n</div>\n<br class=\"clear\"/>\n";

 // the actual table and stuff
 output += "<div class=\"tablecont\">\n<table style=\"width:650px;1px solid white;\">\n<tr>\n<th style=\"width:400px\"> Prompt </th>\n<th style=\"width:50px\"> Answer </th>\n<th style=\"width:200px\"> Feedback </th>\n";
 for(var i=0;i<countEntries;++i)
 {
  var thisletter = String.fromCharCode(65+i);
  output += "</tr><tr>\n";
  output += "<td id=\"" + thisletter + "_ta\"> " + defs[defOrder[i]+1] + "</td>\n";
  output += "<td id=\"" + thisletter + "_tb\"> <input type=\"text\" style=\"width:40px;\" id=\"" + thisletter + "_in\" onBlur=\"checkans(this)\" /> </td>\n";
  output += "<td id=\"" + thisletter + "_tc\"> <input type=\"text\" style=\"width:190px;\" id=\"" + thisletter + "_out\" onFocus=\"blur()\" /> </td>\n"; 
//     <td id="A_ta"> blocking out and avoiding thoughts related to the subject </td>
//     <td id="A_tb"> <input type="text" style="width:40px;" id="A_in" onBlur="checkans(this)" /> </td>
//     <td id="A_tc"> <input type="text" style="width:190px;" id="A_out" onFocus="blur()" /> </td>
 }
 output +=" </tr></table>\n"

 //finishing up!!
 output +="</div>\n<br class=\"clear\" />\n<button onClick=\"clear_all()\" > CLEAR </button>\n</div>\n</body>\n</html>";
 
/*
   <div class="tablecont">
    <table style="width:650px;1px solid white;"> <tr>
     <th style="width:400px"> Prompt </th>
     <th style="width:50px"> Answer </th>
     <th style="width:200px"> Feedback </th>
    </tr><tr>
     <td id="A_ta"> blocking out and avoiding thoughts related to the subject </td>
     <td id="A_tb"> <input type="text" style="width:40px;" id="A_in" onBlur="checkans(this)" /> </td>
     <td id="A_tc"> <input type="text" style="width:190px;" id="A_out" onFocus="blur()" /> </td>
    </tr><tr>
     <td id="B_ta"> Focusing distress on accomplishing something else. </td>
     <td id="B_tb"> <input type="text" style="width:40px;" id="B_in" onBlur="checkans(this)" /> </td>
     <td id="B_tc"> <input type="text" style="width:190px;" id="B_out" onFocus="blur()" /> </td>
    </tr></table>
    </div> 
    <br class="clear" />
    <button onClick="clear_all()" > CLEAR </button>
  </div>
 </body>
</html>

*/
 document.getElementById("outputarea").innerHTML = output;
}

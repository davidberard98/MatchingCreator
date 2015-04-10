
function loaded()
{
 document.getElementById("countEntries").value=0;
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

function create_styles()
{
 var output= "<style>\nbody\n{\n";
 output += "background-color:" + document.getElementById("bgcolor").value + ";\n";
 output += "color:" + document.getElementById("txtcolor").value + ";\n}\ndiv.tablecont\n{\n";
 output += "border: 1px solid " + document.getElementById("txtcolor").value + ";\n}\n</style>\n";
 return output;
}

function create()
{
 var output;
 output="<!DOCTYPE html PUBLIC>\n<html>\n<head>\n<link rel=\"stylesheet\" type=\"text/css\" href=\"matching.css\" />\n";
 output += create_styles();
 document.getElementById("outputarea").innerHTML = output;
}

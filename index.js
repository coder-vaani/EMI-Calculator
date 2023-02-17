let loanAmount = document.getElementById('loan-amount');
let rateOfInterest = document.getElementById('interest-rate');
let years = document.getElementById('time');
let emi, total, interest;

let btn = document.getElementById('btn');
let res = document.getElementById('emi');
let tot = document.getElementById('total');
let int = document.getElementById('interest');

res.style.display = 'none';
tot.style.display = 'none';
int.style.display = 'none';

//Adding Event Listener to button
btn.addEventListener('click', () => {
    a = loanAmount.value;
    r = (rateOfInterest.value) / 12 / 100;
    t = (years.value) * 12;
    //calculation of EMI
    emi = ((a * r * (1 + r) ** t) / (((1 + r) ** t) - 1));
    emi = parseFloat(emi).toFixed(2); //parsing to 2 decimal places
    total = emi * t;
    total = parseFloat(total).toFixed(2); //parsing to 2 decimal places
    interest = total - a;
    interest = parseInt(interest).toFixed(2); //parsing to 2 decimal places

    //function to create pie chart
    function showChart() {
        var x = (a * 100) / total;
        var y = 100 - x;
        if (isNaN(x)) {
            x = y = 50;
        }

        var chart = new CanvasJS.Chart("emiChart", {
            animationEnabled: true,
            title: {
                text: "Amount Break-Up"
            },
            data: [{
                type: "pie",
                startAngle: 360,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: [
                    { y: x, label: "Loan Amount" },
                    { y: y, label: "Payable Interest" },
                ]
            }]
        });
        chart.render();
    }
    showChart();


    //setting comma to output
    function numberWithCommas(x) {
        return x.toString().split('.')[0].length > 3 ? x.toString().substring(0, x.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length - 3) : x.toString();
    }
    emi = numberWithCommas(emi);
    total = numberWithCommas(total);
    interest = numberWithCommas(interest);


    //Assign the results
    res.innerText = emi;
    tot.innerText = total;
    int.innerText = interest;

    //Display the results
    res.style.display = 'block';
    tot.style.display = 'block';
    int.style.display = 'block';


    // resetting the values to empty
    emi = 0;
})
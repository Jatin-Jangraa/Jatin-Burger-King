
import { PieChart, Pie, Cell,Tooltip,Legend, ResponsiveContainer} from "recharts";




const PieComponent = ({apidata}) => {

  console.log(apidata);
  


let COLORS = apidata.color;
  let data= apidata.apidata||[];

  return (<>
    <ResponsiveContainer width="100%" height={370}>
    <PieChart >
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="hsl(243, 52%, 68%)"
        dataKey="number"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart></ResponsiveContainer></>
  );
};

export default PieComponent;
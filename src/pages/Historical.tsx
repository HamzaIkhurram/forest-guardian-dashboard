
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Generate realistic historical data
const generateEventData = () => {
  // Starting from May 1, 2025
  const startDate = new Date(2025, 3, 1);
  const dailyData = [];
  const weeklyData = [];
  const monthlyData = [];
  
  // Generate daily data for past 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - i);
    
    // More chainsaws during weekdays
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const chainsawBase = isWeekend ? 2 : 8;
    
    dailyData.unshift({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      chainsaw: Math.floor(Math.random() * chainsawBase + (isWeekend ? 0 : 4)),
      fire: Math.floor(Math.random() * 3),
      bird: Math.floor(Math.random() * 20 + 40),
      animal: Math.floor(Math.random() * 10 + 15),
      avgDb: Math.floor(Math.random() * 15 + 45)
    });
  }
  
  // Generate weekly data for past 12 weeks
  for (let i = 0; i < 12; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - (i * 7));
    
    weeklyData.unshift({
      date: `Week ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      chainsaw: Math.floor(Math.random() * 30 + 20),
      fire: Math.floor(Math.random() * 5 + 1),
      bird: Math.floor(Math.random() * 100 + 200),
      animal: Math.floor(Math.random() * 50 + 80),
      avgDb: Math.floor(Math.random() * 10 + 50),
      falsePositive: Math.random() * 0.1 + 0.05
    });
  }
  
  // Generate monthly data for past 6 months
  for (let i = 0; i < 6; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() - i);
    
    const isSummer = date.getMonth() >= 4 && date.getMonth() <= 8; // May to Sep
    const fireBase = isSummer ? 10 : 3;
    
    monthlyData.unshift({
      date: date.toLocaleDateString('en-US', { month: 'long' }),
      chainsaw: Math.floor(Math.random() * 80 + 60),
      fire: Math.floor(Math.random() * fireBase + (isSummer ? 5 : 1)),
      bird: Math.floor(Math.random() * 300 + 800),
      animal: Math.floor(Math.random() * 150 + 200),
      avgDb: Math.floor(Math.random() * 5 + 52),
      falsePositive: Math.random() * 0.08 + 0.04
    });
  }
  
  return { dailyData, weeklyData, monthlyData };
};

// Calculate each of our datasets
const { dailyData, weeklyData, monthlyData } = generateEventData();

export default function Historical() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [chartTab, setChartTab] = useState<'line' | 'bar'>('line');
  
  // Map timeframes to their datasets
  const data = {
    daily: dailyData,
    weekly: weeklyData,
    monthly: monthlyData
  }[timeframe];

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Historical Trends</h1>
        
        <div className="flex items-center gap-3 bg-muted/50 p-1 rounded-lg">
          <Button 
            variant={timeframe === 'daily' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setTimeframe('daily')}
            className={timeframe === 'daily' ? 'shadow-sm' : ''}
          >
            Daily
          </Button>
          <Button 
            variant={timeframe === 'weekly' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setTimeframe('weekly')}
            className={timeframe === 'weekly' ? 'shadow-sm' : ''}
          >
            Weekly
          </Button>
          <Button 
            variant={timeframe === 'monthly' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setTimeframe('monthly')}
            className={timeframe === 'monthly' ? 'shadow-sm' : ''}
          >
            Monthly
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Event Detection Trends</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Sound events detected over time</p>
            </div>
            <Tabs value={chartTab} onValueChange={(v) => setChartTab(v as 'line' | 'bar')} className="w-[180px]">
              <TabsList className="grid grid-cols-2 h-8">
                <TabsTrigger value="line">Line</TabsTrigger>
                <TabsTrigger value="bar">Bar</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartTab === 'line' ? (
                  <LineChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 25,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }} 
                      angle={-35}
                      textAnchor="end"
                      height={60}
                      tickMargin={10}
                    />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      }}
                      labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Line 
                      type="monotone" 
                      dataKey="chainsaw" 
                      name="Chainsaw" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="fire" 
                      name="Fire" 
                      stroke="#f97316" 
                      strokeWidth={2} 
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bird" 
                      name="Bird" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="animal" 
                      name="Animal" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                ) : (
                  <BarChart
                    data={data}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 25,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      angle={-35}
                      textAnchor="end"
                      height={60}
                      tickMargin={10}
                    />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      }}
                      labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="chainsaw" name="Chainsaw" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="fire" name="Fire" fill="#f97316" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bird" name="Bird" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="animal" name="Animal" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Average Sound Levels</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Decibel readings over time</p>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 25,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    angle={-35}
                    textAnchor="end"
                    height={60}
                    tickMargin={10}
                  />
                  <YAxis 
                    domain={[30, 80]}
                    label={{ 
                      value: 'dB', 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: -5,
                      style: { textAnchor: 'middle' }
                    }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      borderRadius: '8px',
                      border: '1px solid #eee',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                    }}
                    labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="avgDb" 
                    name="Average dB" 
                    stroke="#8b5cf6" 
                    fill="url(#colorDb)" 
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorDb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {(timeframe === 'weekly' || timeframe === 'monthly') && (
          <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>False-Positive Rate</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">System accuracy improvements over time</p>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 25,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      angle={-35}
                      textAnchor="end"
                      height={60}
                      tickMargin={10}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
                      domain={[0, 0.2]}
                    />
                    <Tooltip 
                      formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'False Positive Rate']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      }}
                      labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="falsePositive" 
                      name="False Positive Rate" 
                      stroke="#f43f5e" 
                      strokeWidth={2}
                      dot={{ stroke: '#f43f5e', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/30">
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Accuracy Trend</h4>
                <p className="text-xs mt-1 text-yellow-700 dark:text-yellow-300">
                  The false-positive rate has decreased by {Math.floor(Math.random() * 30 + 20)}% over the past 3 months due to improved AI model training with field data.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

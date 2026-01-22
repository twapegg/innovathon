'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { WeeklyTrend } from '@/lib/types';
import { COLORS, Card } from './SharedComponents';

// ============ TREND CHART ============
export const TrendChart: React.FC<{
  title: string;
  data: WeeklyTrend[];
  lines: { key: keyof WeeklyTrend; name: string; color: string }[];
}> = ({ title, data, lines }) => (
  <Card title={title}>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
        <defs>
          {lines.map((line, idx) => (
            <linearGradient key={`gradient-${idx}`} id={`gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={line.color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={line.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb10" strokeWidth={1} />
        <XAxis dataKey="day" stroke="#d1d5db" fontSize={12} />
        <YAxis stroke="#d1d5db" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.98)',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
          cursor={{ stroke: '#cbd5e130', strokeWidth: 1 }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px', fontSize: 12 }} />
        {lines.map((line, idx) => (
          <Line
            key={line.key as string}
            type="monotone"
            dataKey={line.key as string}
            stroke={line.color}
            name={line.name}
            strokeWidth={2.5}
            dot={{ r: 4, fill: line.color, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={800}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

// ============ BAR CHART ============
export const BarChartComponent: React.FC<{
  title: string;
  data: any[];
  bars: { key: string; name: string; color: string }[];
}> = ({ title, data, bars }) => (
  <Card title={title}>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {bars.map((bar, idx) => (
            <linearGradient key={`bar-gradient-${idx}`} id={`bar-gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={bar.color} stopOpacity={1} />
              <stop offset="100%" stopColor={bar.color} stopOpacity={0.6} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb20" strokeWidth={1} />
        <XAxis dataKey="month" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        {bars.map((bar, idx) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            fill={`url(#bar-gradient-${idx})`}
            name={bar.name}
            radius={[12, 12, 4, 4]}
            isAnimationActive={true}
            animationDuration={800}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

// ============ SIMPLE LINE CHART ============
export const SimpleLineChart: React.FC<{
  title: string;
  data: any[];
  dataKey: string;
  color?: string;
}> = ({ title, data, dataKey, color = COLORS.primary }) => (
  <Card title={title}>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb20" strokeWidth={1} />
        <XAxis dataKey="month" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" domain={[0, 100]} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          }}
          cursor={{ stroke: '#cbd5e140', strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={4}
          dot={{ r: 6, fill: color, strokeWidth: 0 }}
          activeDot={{ r: 8 }}
          isAnimationActive={true}
          animationDuration={800}
        />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

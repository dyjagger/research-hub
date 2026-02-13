import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { enterpriseVsIndividual } from '../data/researchData';

export default function EnterpriseVsIndividual() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Enterprise vs Individual</h1>
        <p className="text-gray-400 text-sm">How adoption patterns differ across Fortune 100, mid-market, startups, and individual developers.</p>
      </div>

      {/* Main Chart */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Adoption by Segment & Tool Type</h3>
        <p className="text-xs text-gray-500 mb-4">Enterprise leads in copilots, but startups lead in MCP experimentation</p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={enterpriseVsIndividual}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="segment" tick={{ fill: '#9ca3af', fontSize: 10 }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar dataKey="copilotAdoption" fill="#3b82f6" name="AI Copilot Adoption" radius={[3, 3, 0, 0]} />
            <Bar dataKey="agentExperimentation" fill="#8b5cf6" name="Agent Experimentation" radius={[3, 3, 0, 0]} />
            <Bar dataKey="mcpDeployment" fill="#f59e0b" name="MCP Deployment" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Segment Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-400 mb-2">Fortune 100</h3>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li>• 90% use GitHub Copilot (confirmed by Microsoft)</li>
            <li>• 62% experimenting with agentic AI (McKinsey)</li>
            <li>• Enterprise Copilot growth: 75% QoQ in Q2 2025</li>
            <li>• ROI realized within 3-6 months of deployment</li>
            <li>• PR time dropped from 9.6 days → 2.4 days</li>
          </ul>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-purple-400 mb-2">Startups & SMBs</h3>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li>• Higher MCP adoption (35%) than Fortune 500 (30%)</li>
            <li>• More willing to experiment with agentic coding</li>
            <li>• Cursor dominates in startup ecosystem</li>
            <li>• AI-native startups reach 50%+ AI code faster</li>
            <li>• Less regulatory friction enables faster adoption</li>
          </ul>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-green-400 mb-2">Individual Developers</h3>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li>• 76% using or planning to use AI tools (SO 2025)</li>
            <li>• 51% use AI tools daily (professional devs)</li>
            <li>• Only 25% actively using agents</li>
            <li>• MCP adoption still low (~15%) — mostly builders</li>
            <li>• Experienced devs most skeptical (highest distrust)</li>
          </ul>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-amber-400 mb-2">Key Differences</h3>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li>• Enterprise: compliance-first, slow rollout, high spend</li>
            <li>• Startups: speed-first, experimental, cost-sensitive</li>
            <li>• Individual: tool-first, skeptical, productivity-focused</li>
            <li>• Banking/finance: 80% adoption despite regulations</li>
            <li>• Insurance: 70% — AI tools are mainstream even in risk-averse sectors</li>
          </ul>
        </div>
      </div>

      <InsightCallout color="blue">
        The adoption story differs dramatically by segment. Fortune 100 companies are all-in on copilots (90%) 
        but cautious on agents. Startups are more experimental across the board. Individual developers have the 
        highest skepticism — experienced devs (10+ years) show the lowest trust and highest distrust rates.
      </InsightCallout>
    </div>
  );
}

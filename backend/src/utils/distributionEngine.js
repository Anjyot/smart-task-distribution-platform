export const distributeRecords = (records, agents) => {
  if (!agents || agents.length === 0) {
    throw new Error('No agents available for distribution');
  }

  const totalRecords = records.length;
  const totalAgents = agents.length;
  const recordsPerAgent = Math.floor(totalRecords / totalAgents);
  const remainingRecords = totalRecords % totalAgents;

  const distributedTasks = [];
  let recordIndex = 0;

  agents.forEach((agent, agentIndex) => {
    const recordsForThisAgent = recordsPerAgent + (agentIndex < remainingRecords ? 1 : 0);

    for (let i = 0; i < recordsForThisAgent; i++) {
      if (recordIndex < totalRecords) {
        distributedTasks.push({
          ...records[recordIndex],
          assignedAgent: agent._id,
        });
        recordIndex++;
      }
    }
  });

  return distributedTasks;
};

export const calculateDistributionSummary = (distributedTasks, agents) => {
  const summary = {};

  agents.forEach((agent) => {
    const count = distributedTasks.filter((task) => task.assignedAgent.toString() === agent._id.toString()).length;
    summary[agent._id] = {
      name: agent.name,
      count,
      percentage: ((count / distributedTasks.length) * 100).toFixed(2),
    };
  });

  return summary;
};

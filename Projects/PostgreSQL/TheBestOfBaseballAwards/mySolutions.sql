SELECT
	teams.name,
	ROUND(AVG(weight), 0) AS "Avg Team Weight",
  batting.yearID
FROM people
JOIN batting
	ON people.playerID = batting.playerID
JOIN teams
	ON batting.team_ID = teams.ID
GROUP BY teams.name, batting.yearID
ORDER BY 2 DESC;



SELECT
	teams.name,
	ROUND(AVG(height), 0) AS "Avg Team Height",
  batting.yearID
FROM people
JOIN batting
	ON people.playerID = batting.playerID
JOIN teams
	ON batting.team_ID = teams.ID
GROUP BY teams.name, batting.yearID
ORDER BY 2;



SELECT
	teams.name,
	SUM(salaries.salary) AS "Total Salary",
  salaries.yearID
FROM salaries
JOIN teams
	ON salaries.team_id = teams.id
GROUP BY teams.name, salaries.yearID
ORDER BY 2 DESC;


SELECT
	teams.name,
	ROUND((SUM(salaries.salary) / teams.w)) AS "Cost per Win",
  teams.w AS "# of Wins"
FROM salaries
JOIN teams
	ON salaries.team_id = teams.id
  AND salaries.yearid = teams.yearid
WHERE salaries.yearID = 2010
GROUP BY teams.name, teams.w
ORDER BY 2;


SELECT
  people.namegiven,
  salaries.salary / pitching.g AS "Cost to start per game",
  pitching.yearID,
  pitching.g
FROM pitching
JOIN salaries
	ON pitching.playerID = salaries.playerID
  AND pitching.yearID = salaries.yearID
  AND pitching.teamID = salaries.teamID
JOIN people
	ON pitching.playerID = people.playerID
WHERE pitching.gs >= 10
ORDER BY 2 DESC;
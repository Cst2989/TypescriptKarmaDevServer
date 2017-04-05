import { PremierLeague } from './data/premier-league';

let premierLeague = new PremierLeague();

let HomeTeam = "Chelsea";
let AwayTeam = "Man City";

let leagueHomeStrength = premierLeague.leagueAtackStrength();
let leagueAwayStrength = premierLeague.leagueDefenseStrength();

let homeAt = premierLeague.getHomeAtack(HomeTeam);
let homeDef = premierLeague.getHomeDefense(HomeTeam);

let awayAt = premierLeague.getAwayAtack(AwayTeam);
let awayDef = premierLeague.getAwayDefense(AwayTeam);

let predictedHomeGoals = homeAt * awayDef * leagueHomeStrength;
let predictedAwayGoals = awayAt * homeDef * leagueAwayStrength;

function factorial(number){
    let sum = 1;
    for (let i = 1; i <= number; i++) {
        sum = sum*i;
    }
    return sum;
}

function probabilityCalc(numberGoals, predictedNumber): number {
    return Math.pow(predictedNumber, numberGoals) * Math.pow(Math.E, -predictedNumber) / factorial(numberGoals) ;
}

let home0 = probabilityCalc(0, predictedHomeGoals);
let home1 = probabilityCalc(1, predictedHomeGoals);
let home2 = probabilityCalc(2, predictedHomeGoals);

let away0 = probabilityCalc(0, predictedAwayGoals);
let away1 = probabilityCalc(1, predictedAwayGoals);
let away2 = probabilityCalc(2, predictedAwayGoals);

let Under = ((home0*away0) + (home1*away0) + (home0*away1) + (home1*away1) + (home2*away0) + (home0*away2)) * 100;
let Over = 100 - Under;

console.log("Under: ", Math.round(Under * 100) / 100 + " %");
console.log("Over: ", Math.round(Over * 100) / 100 + " %")

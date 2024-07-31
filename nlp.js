const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;

const analyzer = new Analyzer("English", stemmer, "afinn");

const nlp = async (req) => {
  const tokens = await tokenizer.tokenize(req);
  const results = analyzer.getSentiment(tokens);
  return {
    sentiment: results
  }
};

module.exports = nlp;





import React, { Component } from 'react';
import { Link} from 'react-router-dom';

class PokemonDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pokemonSpecies: undefined,
      pokemonEvolutionChain: undefined,
    };
    this.askPokemonEvolutionChain = this.askPokemonEvolutionChain.bind(this);
    this.askPokemonSpecies = this.askPokemonSpecies.bind(this);
  }

  askPokemonSpecies (urlSpecies) {
    console.log('EVOLUTION');
    console.log(urlSpecies);
    fetch(urlSpecies)
    .then((response) => {
      return response.json();
    })
    .then((json) => { 
      console.log(json);
      return (this.setState({pokemonSpecies: json }), this.askPokemonEvolutionChain());
    })
  }

  askPokemonEvolutionChain() {
    console.log('EVOLUTION2');
    if (this.state.pokemonSpecies!==undefined){
      let urlEvolutionChain = this.state.pokemonSpecies.evolution_chain;
      console.log('evolution url',urlEvolutionChain);
    }
    

  }

  render() {
    console.log('PokemonDetails',this.props);
    console.log('STATE DETAIL', this.state);
    const{
      match,
      pokemonData,
    } = this.props;
    const {pokemonEvolutionChain} = this.state;
    const {params} = match;
    
    const pokemonId = parseInt(params.id);
    let pokemonChosen = pokemonData.filter((pokemon) => {
      return pokemon.id === pokemonId;
    });
    console.log('pokemonchosen',pokemonChosen);
    let pokemonInfo = pokemonChosen[0];
    console.log('pokemonInfo', pokemonInfo);
    if (pokemonInfo!==undefined&&this.state.pokemonSpecies===undefined) {
      this.askPokemonSpecies(pokemonInfo.species.url);
    }
    
    
    return (
      <div >
        <div>
          <img src="" alt=""/>
          <p>{pokemonInfo!==undefined?pokemonInfo.name:'No data'}</p>
          <ul>
            <li>
              Altura: {pokemonInfo!==undefined?pokemonInfo.height:'No data'}
            </li>
            <li>
              Peso: {pokemonInfo!==undefined?pokemonInfo.weight:'No data'}
            </li>
            <li>
              Habilidades: 
              <ul>
              {pokemonInfo!==undefined
                ?(pokemonInfo.abilities.map((pokemonAbilities) => {
                  const {
                    ability,
                    slot
                  } = pokemonAbilities;
                  return (
                    <li key={slot}>{ability.name}</li>
                  );
                  }))
                : 'No data'}
              </ul>
            </li>
            <li>
              Evoluciones:
              <ul>
                {

                }
              </ul>
            </li>
          </ul>
        </div>
        <Link 
          to="/" 
          className="btn-back" 
        >
          Volver al listado
        </Link>
      </div>
    );
  }
}

export default PokemonDetail;

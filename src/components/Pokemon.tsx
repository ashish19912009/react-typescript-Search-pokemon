import React,{Component} from 'react';
import User from '../Interfaces/user.interface';

interface SearchState {
    name: string;
    numberOfAbility: number;
    baseExperience : number;
    imageUrl: string;
    error?: boolean;
}

class Pokemon extends Component<User, SearchState>{

    constructor(props:User){
        super(props);
        this.pokemonRef = React.createRef();
        this.state = {
            name:'',
            numberOfAbility: 0,
            baseExperience : 0,
            imageUrl: '',
            error: false
        }
    }
    pokemonRef: React.RefObject<HTMLInputElement>;

    searchClickHandler = () => {
        const inputValue = this.pokemonRef.current!.value;
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}/`)
        .then(res => {
            if(res.status !== 200)
            {
                this.setState({error: true});
                return;
            }
          return res.json()
        })
        .then(data=> {
            this.setState({
                name: data.name,
                numberOfAbility: data.abilities.length,
                baseExperience: data.base_experince,
                imageUrl: data.sprites.front_default
            });
        })
        .catch(err=> this.setState({error: true}));
    }

    render(){
        const{Username, numberOfPokemon} = this.props;
        const { name, numberOfAbility, baseExperience, imageUrl, error } = this.state;

        let resultMarkUp;
        if(error)
            resultMarkUp = <p><span>Something Went Wrong 🥺!!!</span></p>
        else
            resultMarkUp = <div>
                <img src={imageUrl} />
                <p>{name} has {numberOfAbility} abilities and {baseExperience} base experince.</p>
            </div>
        return(<React.Fragment>
            <h1>User {Username} {numberOfPokemon && <span> has {numberOfPokemon} Pokemons</span>}</h1>
            <input type='text' ref={this.pokemonRef}/>
            <button onClick={this.searchClickHandler} className='myButton'>Search</button>
            {resultMarkUp}
            <span>e.g. Try Typing pikachu</span>
        </React.Fragment>);
    }
}

export default Pokemon;

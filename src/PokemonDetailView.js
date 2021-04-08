import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

PokemonDetailView.propTypes = {
  id: PropTypes.number.isRequired,
};

export default function PokemonDetailView(props) {
    const { id } = props;

    const [loading, setLoading] = React.useState(true);
    const [info, setInfo] = React.useState(null);

    React.useEffect(() => {
        axios.request({
            url: `https://pokeapi.co/api/v2/pokemon/${id}`
        }).then(res => {
            setLoading(false);
            const { data: { sprites, types: _types } } = res;
            const types = _types.map(t => t.type.name);
            const { front_default: avatar } = sprites;
            setInfo({
                types,
                avatar
            });
        }).catch(err => {
            console.error('something went wrong', err);
        });
    }, [id]);

    if (loading || !info) {
        return (
            <div></div>
        );
    }

    return (
        <div>
            <img src={info.avatar} alt={info.types.join(', ')} height={100} />
            {info.types.join(', ')}
        </div>
        );
};

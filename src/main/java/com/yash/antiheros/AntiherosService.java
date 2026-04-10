

package com.yash.antiheros;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AntiherosService {

    @Autowired
    private AntiherosRepository antiherosRepository;

    public List<Antihero> getAllAntiheroes() {
        return antiherosRepository.findAll();
    }

    public Antihero getAntiheroById(long id) {
        return antiherosRepository.findById(id).orElse(null);
    }

    public Antihero addAntihero(Antihero antihero) {
        return antiherosRepository.save(antihero);
    }

    public Antihero updateImageUrl(long id, String imageUrl) {
        Antihero antihero = antiherosRepository.findById(id).orElse(null);
        if (antihero == null) return null;
        antihero.setImageUrl(imageUrl);
        return antiherosRepository.save(antihero);
    }

    public void updateAntihero(Antihero antihero) {
        antiherosRepository.save(antihero);
    }

    public void deleteAntihero(long id) {
        antiherosRepository.deleteById(id);
    }

    public List<Antihero> getByUniverse(String universe) {
        return antiherosRepository.findByUniverse(universe);
    }

    public List<Antihero> searchByName(String name) {
        return antiherosRepository.findByNameContainingIgnoreCase(name);
    }
}

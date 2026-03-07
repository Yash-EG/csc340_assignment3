package com.yash.antiheros;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/antiheroes")
public class AntiherosController {

    @Autowired
    private AntiherosService antiherosService;

    @GetMapping
    public List<Antihero> getAllAntiheroes() {
        return antiherosService.getAllAntiheroes();
    }

    @GetMapping("/search")
    public List<Antihero> searchByName(@RequestParam String name) {
        return antiherosService.searchByName(name);
    }

    @GetMapping("/universe/{universe}")
    public List<Antihero> getByUniverse(@PathVariable String universe) {
        return antiherosService.getByUniverse(universe);
    }

    @GetMapping("/{id}")
    public Antihero getAntiheroById(@PathVariable long id) {
        return antiherosService.getAntiheroById(id);
    }

    @PostMapping
    public String addAntihero(@RequestBody Antihero antihero) {
        antiherosService.addAntihero(antihero);
        return "Antihero added successfully!";
    }

    @PutMapping("/{id}")
    public Antihero updateAntihero(@PathVariable long id, @RequestBody Antihero antihero) {
        antihero.setCharacterId(id);
        antiherosService.updateAntihero(antihero);
        return antiherosService.getAntiheroById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteAntihero(@PathVariable long id) {
        antiherosService.deleteAntihero(id);
        return "Antihero with ID " + id + " deleted.";
    }
}

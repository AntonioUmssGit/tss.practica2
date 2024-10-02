package tss.practica2.factory;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Data;

@RestController
@Data
@RequestMapping("/factory")
@CrossOrigin("*")
public class FactoryController {

    @PostMapping("/cutmin")// para cortar ordenado de mayor a menor
    public ArrayList<Barra> cutIronMin(@RequestBody ArrayList<Double> pedidos){
        Factory factory = new Factory();
        return factory.pedirMinimo(pedidos);
    }
    @PostMapping("/cutfifo")
    public ArrayList<Barra> cutIronFiFo(@RequestBody ArrayList<Double> pedidos){
        Factory factory = new Factory();
        return factory.pedirFifo(pedidos);
    }
    @PostMapping("/cutpermutacion")
    public ArrayList<Barra> cutIronPermutacion(@RequestBody ArrayList<Double> pedidos){
        Factory factory = new Factory();
        return factory.pedirPermutacion(pedidos);
    }
    
    @GetMapping("/hello")
    public String great(){
        return "hello world";
    }
}
